using Newtonsoft.Json.Linq;

namespace LowAttemptLowCode.API.Entities.Request
{
    public class AddModelRequest
    {
        public string Author { get; set; }
        public string ModelName { get; set; }
        public long ResponseCount { get; set; }
        public JObject Model { get; set; }
    }
}
