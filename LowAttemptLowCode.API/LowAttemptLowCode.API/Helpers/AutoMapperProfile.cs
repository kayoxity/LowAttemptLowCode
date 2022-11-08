using AutoMapper;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;

namespace LowAttemptLowCode.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AddModelRequest, ModelSchema>();
            CreateMap<UpdateModelRequest, ModelSchema>();
        }
    }
}
