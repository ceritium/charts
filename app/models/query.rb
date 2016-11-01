class Query < ApplicationRecord

  validates :name, presence: true

  belongs_to :source

  # TODO: remove
  VALID_PARAMS = ['account_code']

  def preview(params = {})
    filtered_params = params.permit(VALID_PARAMS).to_h

    source.conn.fetch(sql, filtered_params).limit(100).all
  end

  def self.preview(sql:, test_data: '')
    filtered_params = YAML.load(test_data.strip).try(:symbolize_keys) || {}
    fetch = source.conn.fetch(sql, filtered_params).limit(100)
    {data: fetch.all, columns: fetch.columns}
  rescue Exception => e
    p e
    {data: [], columns: []}
  end
end
