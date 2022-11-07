namespace LowAttemptLowCode.API.Entities.Response
{
    public class APIResponseModel<T>
    {
        public T Data { get; set; }
        public bool Error { get; set; }
        public string ErrorDetails { get; set; }
        public APIResponseModel(T data)
        {
            this.Data = data;
        }

        public APIResponseModel(bool error, string errorDetails)
        {
            this.Error = error;
            this.ErrorDetails = errorDetails;
        }
    }
}
