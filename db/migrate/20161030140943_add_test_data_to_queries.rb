class AddTestDataToQueries < ActiveRecord::Migration[5.0]
  def change
    add_column :queries, :test_data, :text
  end
end
