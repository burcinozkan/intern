namespace StajApp
{
    public class CustomException : Exception
    {
        public string AdditionalInfo { get; set; }

        public CustomException(string message, Exception innerException, string additionalInfo) : base(message, innerException)
        { 
            AdditionalInfo = additionalInfo;
        }
    }
}
