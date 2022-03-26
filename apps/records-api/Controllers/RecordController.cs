using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AngularDotnetDemo.RecordsApi.Models;
using AngularDotnetDemo.RecordsApi.Services;

namespace AngularDotnetDemo.RecordsApi.Controllers
{
  [ApiController]
  [Route("/api/records")]
  public class RecordController : ControllerBase
  {

    private readonly ILogger<RecordController> _logger;
    private readonly IRecordService _RecordService;


    public RecordController(ILogger<RecordController> logger, IRecordService recordService)
    {
      _logger = logger;
      _RecordService = recordService;
    }

    [HttpGet]
    public IEnumerable<Record> GetAll() => _RecordService.GetAll();

    [HttpGet("{id}")]
    public ActionResult<Record> GetOne(string id)
    {
      if (!_RecordService.HasOne(id)) return NotFound();
      return _RecordService.GetOne(id);
    }

    [HttpPost]
    public ActionResult<Record> CreateOne([FromBody] Record newRecord)
    {
      if (_RecordService.HasOne(newRecord.Id)) return Conflict();
      _RecordService.CreateOne(newRecord);
      return Created("/api/records/" + newRecord.Id, newRecord);
    }

    [HttpPut("{id}")]
    public ActionResult<Record> UpdateOne([FromBody] Record updatedRecord) {
        if (!_RecordService.HasOne(updatedRecord.Id)) return NotFound();
        return _RecordService.UpdateOne(updatedRecord);
    }

    [HttpDelete("{id}")]
    public ActionResult<Record> DeleteOne(string id) {
        if (!_RecordService.HasOne(id)) return NoContent();
        _RecordService.DeleteOne(id);
        return NoContent();
    }
  }
}
