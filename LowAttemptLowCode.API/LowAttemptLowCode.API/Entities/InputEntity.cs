namespace LowAttemptLowCode.API.Entities
{
    public class InputEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }
        public string Required { get; set; }
        public List<string> Values { get; set; }
    }
}
