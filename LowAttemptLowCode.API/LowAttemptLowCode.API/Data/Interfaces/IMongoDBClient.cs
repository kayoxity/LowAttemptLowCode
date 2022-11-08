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
        public Task UpdateAsync(BsonDocument data, string id);
        public Task<BsonDocument> GetByIdAsync(string id);
        public Task<List<BsonDocument>> GetAllAsync();
        public Task<List<BsonDocument>> GetAllResponsesByModelId(string modelId);
        public Task IncrementResponseAsync(string modelId);
    }
}
