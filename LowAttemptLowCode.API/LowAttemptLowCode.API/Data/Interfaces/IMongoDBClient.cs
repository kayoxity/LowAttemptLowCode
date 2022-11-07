using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LowAttemptLowCode.API.Data.Interfaces
{
    public interface IMongoDBClient
    {
        public void SetDatabaseAndCollection(string databaseName, string collectionName);
        public Task InsertAsync(BsonDocument data);
        public Task<ModelSchema> GetAsync();
    }
}
