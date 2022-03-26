using System;
using System.Text.Json.Serialization;

namespace AngularDotnetDemo.RecordsApi.Models
{
  public class Record
  {

    [JsonPropertyName("id")]
    public String Id { get; set; }

    [JsonPropertyName("title")]
    public String Title { get; set; }


    [JsonPropertyName("author")]
    public String Author { get; set; }


    [JsonPropertyName("copiesSold")]
    public int CopiesSold { get; set; }


    [JsonPropertyName("published")]
    public DateTime Published { get; set; }
  }
}
