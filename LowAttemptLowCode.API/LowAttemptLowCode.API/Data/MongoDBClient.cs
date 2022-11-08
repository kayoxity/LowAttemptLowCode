using System.Collections.Concurrent;
using AutoMapper;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Helpers;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace LowAttemptLowCode.API.Data
{
    public class MongoDBClient : IMongoDBClient
    {
        private static ConcurrentDictionary<string, IMongoDatabase> _mongoDatabases;
        private readonly IMongoClient _mongoClient;
        private readonly IMapper _mapper;
        private IMongoDatabase _mongoDatabase;
        private string _collectionName;

        public MongoDBClient(IMongoClient mongoClient, IMapper mapper)
        {
            _mongoClient = mongoClient;
            _mapper = mapper;
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
        public async Task UpdateAsync(BsonDocument data, string id)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            await _mongoDatabase.GetCollection<BsonDocument>(_collectionName).ReplaceOneAsync(filter, data);
        }

        public async Task<BsonDocument> GetByIdAsync(string id)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            var documentList = await _mongoDatabase.GetCollection<BsonDocument>(_collectionName).Find(filter).ToListAsync();
            return documentList.FirstOrDefault();
        }

        public async Task<List<BsonDocument>> GetAllAsync()
        {
            return (await _mongoDatabase.GetCollection<BsonDocument>(_collectionName).FindAsync(new BsonDocument())).ToList();
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
