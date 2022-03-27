namespace AngularDotnetDemo.RecordsApi.Services
{
  using System.Collections.Generic;
  using System.IO;
  using System.Text.Json;
  using AngularDotnetDemo.RecordsApi.Models;

  public interface IRecordService
  {
    public void CreateOne(Record record);

    public bool HasOne(string id);

    public IEnumerable<Record> GetAll();

    public Record GetOne(string id);

    public Record UpdateOne(string id, Record record);

    public void DeleteOne(string id);
  }

  public class MemoryRecordService : IRecordService
  {
    private readonly Dictionary<string, Record> records = new();

    public MemoryRecordService()
    {
      string text = File.ReadAllText("top-selling-records.json");
      Record[] records = JsonSerializer.Deserialize<Record[]>(text);
      foreach (Record record in records) this.records.Add(record.Id, record);
    }

    public void CreateOne(Record record) => this.records.Add(record.Id, record);

    public bool HasOne(string id) => this.records.ContainsKey(id);

    public IEnumerable<Record> GetAll() => this.records.Values;

    public Record GetOne(string id) => this.records[id];

    public Record UpdateOne(string id, Record record)
    {
      record.Id = id;
      this.records[id] = record;
      return record;
    }

    public void DeleteOne(string id) => this.records.Remove(id);
  }
}