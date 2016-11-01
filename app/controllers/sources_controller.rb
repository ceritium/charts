class SourcesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @sources = Source.page(params[:page]).order('id desc')
  end

  def new
    @source = Source.new
  end

  def create
    @source = Source.new(source_params)
    if @source.save
      redirect_to edit_source_path(@source), notice: 'Source created'
    else
      render :new
    end
  end

  def edit
    find_source
  end

  def update
    find_source
    if @source.update(source_params)
      redirect_to edit_source_path(@source), notice: 'Source updated'
    else
      render :edit
    end
  end

  def destroy
    find_source
    @source.destroy
    redirect_to sources_path, notice: 'Source deleted'
  end

  def preview
    find_source
    render json: @source.preview(sql: params[:sql], test_data: params[:testData])
  end

  private

  def source_params
    params.require(:source).permit(:name, :url)
  end

  def find_source
    @source = Source.find(params[:id])
  end
end
