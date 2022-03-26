using System;
using System.Collections.Generic;
using AngularDotnetDemo.RecordsApi.Models;

namespace AngularDotnetDemo.RecordsApi.Services
{
  public interface IRecordService
  {
    public void CreateOne(Record record);
    public bool HasOne(string id);
    public IEnumerable<Record> GetAll();
    public Record GetOne(string id);
    public Record UpdateOne(Record record);
    public void DeleteOne(string id);
  }

  public class MemoryRecordService : IRecordService
  {
    private Dictionary<string, Record> _Records = new Dictionary<string, Record>();
    public void CreateOne(Record record) => _Records.Add(record.Id, record);
    public bool HasOne(string id) => _Records.ContainsKey(id);
    public IEnumerable<Record> GetAll() => _Records.Values;
    public Record GetOne(string id) => _Records[id];
    public Record UpdateOne(Record record) => _Records[record.Id] = record;
    public void DeleteOne(string id) => _Records.Remove(id);
  }
}