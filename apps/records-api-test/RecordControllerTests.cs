namespace AngularDotnetDemo.RecordsApi.Test
{
  using System;
  using System.Collections.Generic;
  using System.Net;
  using System.Net.Http;
  using System.Text;
  using System.Text.Json;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Mvc.Testing;
  using Xunit;
  using Record = AngularDotnetDemo.RecordsApi.Models.Record;

  public class RecordControllerTests
  {
    private readonly string recordControllerBaseUri = "/api/records";

    private readonly Record record1 = new()
    {
      Id = "1",
      Title = "Record 1",
      Author = "Author 1",
      CopiesSold = 1000,
      Published = new DateTime(2021, 12, 1),
    };

    private readonly Record updatedRecord1 = new()
    {
      Id = "1",
      Title = "Updated Record 1",
      Author = "Updated Author 1",
      CopiesSold = 1001,
      Published = new DateTime(2021, 12, 3),
    };

    private readonly Record record2 = new()
    {
      Id = "2",
      Title = "Record 2",
      Author = "Author 2",
      CopiesSold = 2000,
      Published = new DateTime(2021, 12, 2),
    };

    private readonly HttpClient client;

    public RecordControllerTests()
    {
      var application = new WebApplicationFactory<AngularDotnetDemo.RecordsApi.Startup>();
      this.client = application.CreateClient();
    }

    private static StringContent ContentForRecord(Record record) =>
      new(JsonSerializer.Serialize(record), Encoding.UTF8, "application/json");

    private string PathForRecord() => this.recordControllerBaseUri;

    private string PathForRecord(string id) => $"{this.recordControllerBaseUri}/{id}";

    private string PathForRecord(Record record) => this.PathForRecord(record.Id);

    private async Task<HttpResponseMessage> PostOneRecord(Record record) =>
      await this.client.PostAsync(this.PathForRecord(), ContentForRecord(record));

    private async Task<HttpResponseMessage> GetOneRecord(string id) =>
      await this.client.GetAsync(this.PathForRecord(id));

    private async Task<HttpResponseMessage> GetAllRecords() =>
      await this.client.GetAsync(this.PathForRecord());

    private async Task<HttpResponseMessage> PutOneRecord(Record record) =>
      await this.client.PutAsync(this.PathForRecord(record), ContentForRecord(record));

    private async Task<HttpResponseMessage> DeleteOneRecord(string id) =>
      await this.client.DeleteAsync(this.PathForRecord(id));

    [Fact(DisplayName = "GET /api/records returns OK/200 and an empty array when no records exist")]
    public async void GetAllReturnsEmptyArrayWhenNoRecordsExist()
    {
      var getAllResponse = await this.GetAllRecords();
      Assert.True(getAllResponse.IsSuccessStatusCode);

      var getAllResponseBody = await getAllResponse.Content.ReadAsStringAsync();
      Assert.Equal("[]", getAllResponseBody);
    }

    [Fact(DisplayName = "GET /api/records returns OK/200 and all created records")]
    public async void GetAllReturnsOkAndAllCreatedRecords()
    {
      // Post two records to get some content
      Assert.Equal(HttpStatusCode.Created, (await this.PostOneRecord(this.record1)).StatusCode);
      Assert.Equal(HttpStatusCode.Created, (await this.PostOneRecord(this.record2)).StatusCode);

      var getAllResponse = await this.GetAllRecords();
      Assert.True(getAllResponse.IsSuccessStatusCode);

      string getAllResponseBody = await getAllResponse.Content.ReadAsStringAsync();
      List<Record> deserializedResponse = new(JsonSerializer.Deserialize<Record[]>(getAllResponseBody));
      Assert.True(deserializedResponse.Exists(record => record.Id.Equals(this.record1.Id)));
      Assert.True(deserializedResponse.Exists(record => record.Id.Equals(this.record2.Id)));
    }

    [Fact(DisplayName = "POST /api/records when record does not exist returns Created/201 and new record")]
    public async void PostWhenDoesNotExistReturnsCreatedAndNewRecord()
    {
      var postResponse = await this.PostOneRecord(this.record1);
      string postResponseBody = await postResponse.Content.ReadAsStringAsync();
      Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);
      Assert.Equal(JsonSerializer.Serialize(this.record1), postResponseBody);
    }

    [Fact(DisplayName = "POST /api/records when record exists returns Conflict/409")]
    public async void PostWhenExistsReturnsConflict()
    {
      Assert.Equal(HttpStatusCode.Created, (await this.PostOneRecord(this.record1)).StatusCode);
      Assert.Equal(HttpStatusCode.Conflict, (await this.PostOneRecord(this.record1)).StatusCode);
    }

    [Fact(DisplayName = "PUT /api/records/1 when record does not exist returns Not Found/404")]
    public async void PutWhenDoesNotExistReturnsNotFound()
    {
      Assert.Equal(HttpStatusCode.NotFound, (await this.PutOneRecord(this.record1)).StatusCode);
    }

    [Fact(DisplayName = "PUT /api/records/1 when record exists returns OK/200 and updated record")]
    public async void PutWhenExistsReturnsAcceptedAndUpdatedRecord()
    {
      Assert.Equal(HttpStatusCode.Created, (await this.PostOneRecord(this.record1)).StatusCode);
      Assert.Equal(HttpStatusCode.OK, (await this.PutOneRecord(this.updatedRecord1)).StatusCode);

      var getResponse = await this.GetOneRecord(this.record1.Id);
      string getResponseBody = await getResponse.Content.ReadAsStringAsync();
      Assert.Equal(JsonSerializer.Serialize(this.updatedRecord1), getResponseBody);
    }

    [Fact(DisplayName = "DELETE /api/records/1 when record does not exist returns No Content/204")]
    public async void DeleteWhenDoesNotExistReturnsNoContent()
    {
      Assert.Equal(HttpStatusCode.NoContent, (await this.DeleteOneRecord(this.record1.Id)).StatusCode);
    }

    [Fact(DisplayName = "DELETE /api/records/1 when record exists returns No Content/204")]
    public async void DeleteWhenRecordExistsReturnsNoContent()
    {
      Assert.Equal(HttpStatusCode.Created, (await this.PostOneRecord(this.record1)).StatusCode);
      Assert.Equal(HttpStatusCode.NoContent, (await this.DeleteOneRecord(this.record1.Id)).StatusCode);

      this.GetAllReturnsEmptyArrayWhenNoRecordsExist();
    }
  }
}
