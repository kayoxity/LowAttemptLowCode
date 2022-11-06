﻿using Newtonsoft.Json.Linq;

namespace LowAttemptLowCode.API.Entities.Request
{
    public class AddModelRequest
    {
        public string ModelName { get; set; }
        public JObject Model { get; set; }
    }
}