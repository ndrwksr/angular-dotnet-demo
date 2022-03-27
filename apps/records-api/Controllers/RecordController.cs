namespace AngularDotnetDemo.RecordsApi.Controllers
{
  using System.Collections.Generic;
  using AngularDotnetDemo.RecordsApi.Models;
  using AngularDotnetDemo.RecordsApi.Services;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Extensions.Logging;

  [ApiController]
  [Route("/api/records")]
  public class RecordController : ControllerBase
  {

    private readonly ILogger<RecordController> logger;
    private readonly IRecordService recordService;


    public RecordController(ILogger<RecordController> logger, IRecordService recordService)
    {
      this.logger = logger;
      this.recordService = recordService;
    }

    [HttpGet]
    public IEnumerable<Record> GetAll() => this.recordService.GetAll();

    [HttpGet("{id}")]
    public ActionResult<Record> GetOne(string id)
    {
      if (!this.recordService.HasOne(id)) return this.NotFound();
      return this.recordService.GetOne(id);
    }

    [HttpPost]
    public ActionResult<Record> CreateOne([FromBody] Record newRecord)
    {
      if (this.recordService.HasOne(newRecord.Id)) return this.Conflict();
      this.recordService.CreateOne(newRecord);
      return this.Created("/api/records/" + newRecord.Id, newRecord);
    }

    [HttpPut("{id}")]
    public ActionResult<Record> UpdateOne(string id, [FromBody] Record updatedRecord)
    {
      if (!this.recordService.HasOne(id)) return this.NotFound();
      return this.recordService.UpdateOne(id, updatedRecord);
    }

    [HttpDelete("{id}")]
    public ActionResult<Record> DeleteOne(string id)
    {
      if (!this.recordService.HasOne(id)) return this.NoContent();
      this.recordService.DeleteOne(id);
      return this.NoContent();
    }
  }
}
