class PlacesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @places = Place.all
        render json: {
          type: 'FeatureCollection',
          features: @places.map do |place|
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [place.longitude, place.latitude],
              },
              properties: {
                id: place.id,
                name: place.name,
                address: place.address,
                user: place.user
              }
            }
          end
        }
      end
    end
  end

  def show
    @place = Place.find(params[:id])
  end

  def create
    @place = Place.new(place_params)
    @place.user = current_user
    @place.save
  end


  private

  def place_params
    params.require(:place).permit(:name, :street, :city, :state, :country, :latitude, :longitude)
  end
end
