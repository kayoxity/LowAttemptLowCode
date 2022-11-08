using System.Text.Json;
using LowAttemptLowCode.API.Business;
using LowAttemptLowCode.API.Business.Interface;
using LowAttemptLowCode.API.Data;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace LowAttemptLowCode.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddCors();
            builder.Services.ConfigureMongoDB(builder);
            builder.Services.ConfigureAutoMapper();
            builder.Services.AddScoped<IMongoDBClient, MongoDBClient>();
            builder.Services.AddScoped<IModelBL, ModelBL>();
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });
            builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            //if (app.Environment.IsDevelopment())
            //{
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200/"));
            //}
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://pcfreakz.co.in"));
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://pcfreakz.co.in"));
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://www.pcfreakz.co.in"));
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://www.pcfreakz.co.in"));

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://pcfreakz.co.in/"));
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://pcfreakz.co.in/"));
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://www.pcfreakz.co.in/"));
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://www.pcfreakz.co.in/"));

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}