using AutoMapper;
using LowAttemptLowCode.API.Data;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Helpers;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace LowAttemptLowCode.API.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureMongoDB(this IServiceCollection services, WebApplicationBuilder builder)
        {
            var settings = GetMongoDbSettings(builder);
            services.AddSingleton<IMongoClient>(new MongoClient(settings.ConnectionURI));
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddMvc();
        }

        private static MongoDBConnection GetMongoDbSettings(WebApplicationBuilder builder)
        {
            return builder.Configuration.GetSection(nameof(MongoDBConnection)).Get<MongoDBConnection>();
        }
    }
}
