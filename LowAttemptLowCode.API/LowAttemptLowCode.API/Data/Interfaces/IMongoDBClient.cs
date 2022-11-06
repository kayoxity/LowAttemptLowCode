using LowAttemptLowCode.API.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LowAttemptLowCode.API.Data.Interfaces
{
    public interface IMongoDBClient
    {
        public void SetDatabaseAndCollection(string databaseName, string collectionName);
        public Task InsertAsync(BsonDocument data);
    }
}
