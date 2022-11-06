using System.Collections.Concurrent;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Helpers;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LowAttemptLowCode.API.Data
{
    public class MongoDBClient : IMongoDBClient
    {
        private static ConcurrentDictionary<string, IMongoDatabase> _mongoDatabases;
        private readonly IMongoClient _mongoClient;

        private IMongoDatabase _mongoDatabase;
        private string _collectionName;

        public MongoDBClient(IMongoClient mongoClient)
        {
            _mongoClient = mongoClient;
        }

        public void SetDatabaseAndCollection(string databaseName, string collectionName)
        {
            _mongoDatabase = GetDatabase(databaseName);
            _collectionName = collectionName;
        }
        public async Task InsertAsync(BsonDocument data)
        {
            await _mongoDatabase.GetCollection<BsonDocument>(_collectionName).InsertOneAsync(data);
        }

        #region Private Methods

        private IMongoDatabase GetDatabase(string databaseName)
        {
            if (_mongoDatabases == null)
            {
                _mongoDatabases = new ConcurrentDictionary<string, IMongoDatabase>();
            }

            if (!_mongoDatabases.ContainsKey(databaseName))
            {
                _mongoDatabases[databaseName] = _mongoClient.GetDatabase(databaseName);
            }

            return _mongoDatabases[databaseName];
        }

        #endregion Private Methods
    }
}
