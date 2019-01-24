class PlacesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @places = Place.near([params[:lat], params[:lng]], 50)
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
                bar: place.bar,
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
    @user = @place.user
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
