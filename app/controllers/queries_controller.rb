class QueriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_source

  def index
    @queries = @source.queries.page(params[:page])
  end

  def show
    find_query
  end

  def edit
    find_query
  end

  def new
    @query = @source.queries.new
  end

  def create
    @query = @source.queries.new(query_params)
    if @query.save
      redirect_to edit_source_query_path(@source, @query), notice: 'Query created'
    else
      render :new
    end
  end

  def update
    find_query
    if @query.update(query_params)
      redirect_to edit_source_query_path(@source, @query), notice: 'Updated'
    else
      render :edit
    end
  end

  private

  def find_query
    @query = @source.queries.find(params[:id])
  end

  def find_source
    @source = Source.find(params[:source_id])
  end

  def query_params
    params.require(:query).permit(:name, :sql, :test_data)
  end
end
