namespace AngularDotnetDemo.RecordsApi
{
  using AngularDotnetDemo.RecordsApi.Services;
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  using Microsoft.Extensions.Hosting;
  using Microsoft.OpenApi.Models;

  public class Startup
  {
    private readonly string allowOriginsKey = "allow_origins_key";
    private readonly string title = "AngularDotnetDemo.RecordsApi";
    private readonly string version = "v1";

    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
      this.Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();
      services.AddSwaggerGen(c => c.SwaggerDoc(this.version, new OpenApiInfo { Title = this.title, Version = this.version }));

      string webOrigin = this.Configuration["WebOrigin"];
      services.AddCors(options =>
        options.AddPolicy(
          name: this.allowOriginsKey,
          builder => builder.WithMethods("POST", "GET", "PUT", "DELETE", "OPTIONS", "HEAD").WithHeaders("content-type").WithOrigins(webOrigin)));

      services.Add(new ServiceDescriptor(typeof(IRecordService), new MemoryRecordService()));
      services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint($"/swagger/{this.version}/swagger.json", $"{this.title} {this.version}"));
      }

      app.UseHttpsRedirection();
      app.UseRouting();
      app.UseCors(this.allowOriginsKey);
      app.UseAuthorization();
      app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
  }
}
