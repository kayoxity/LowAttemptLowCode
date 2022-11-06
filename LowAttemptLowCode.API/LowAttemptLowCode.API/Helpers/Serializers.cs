using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace LowAttemptLowCode.API.Helpers
{
    public static class Serializers
    {
        public static readonly JsonSerializerSettings camelCaseSerializer = new JsonSerializerSettings() 
        { 
            ContractResolver = new CamelCasePropertyNamesContractResolver() 
        };
    }
}
