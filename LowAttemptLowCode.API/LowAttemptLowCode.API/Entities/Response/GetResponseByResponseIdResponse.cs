using Newtonsoft.Json.Linq;

namespace LowAttemptLowCode.API.Entities.Response
{
    public class GetResponseByResponseIdResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Response> Responses { get; set; }
    }

    public class Response
    {
        public string Label { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public string Required { get; set; }
        public List<string> Values { get; set; }
        public List<string> AllValues { get; set; }
    }
}
