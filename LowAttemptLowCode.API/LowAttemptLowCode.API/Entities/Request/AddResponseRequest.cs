using Newtonsoft.Json.Linq;

namespace LowAttemptLowCode.API.Entities.Request
{
    public class AddResponseRequest
    {
        public string ModelId { get; set; }
        public string Name { get; set; }
        public JArray Response { get; set; }
    }
}
