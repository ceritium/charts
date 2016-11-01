class Source < ApplicationRecord

  validates :name, presence: true
  validates :url, presence: true

  has_many :queries

  def conn
    @conn ||= Sequel.connect(URI.encode(url), loggers: [Logger.new($stdout)])
  end

  def preview(sql:, test_data: '')
    filtered_params = YAML.load(test_data.strip).try(:symbolize_keys) || {}
    fetch = conn.fetch(sql, filtered_params).limit(100)#.where(account_code: 'acc_bb5a338335dc0e3881bc8951ffc29d1a')
    {data: fetch.all, columns: fetch.columns}
  rescue Exception => e
    p e
    {data: [], columns: []}
  end


end
