using Microsoft.Extensions.ObjectPool;
using System.ComponentModel;
using System.Text.Json.Serialization;
using System.Collections;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CIM.Models
{
    public class Device
    {   
        public int Id { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsDeployed { get; set; } = false;
        public DateTime? DeletedAt { get; set; } = null;
        [DisplayName("Device Name")]
        public string Name { get; set; }
        [DisplayName("Service Tag")]
        public string ServiceTag { get; set; }
        [DisplayName("OU")]
        public string? OU { get; set; }
        [DisplayName("Primary User")]
        public string? PU { get; set; }
        public string Status { get; set; }
        [NotMapped]
        public bool[] ImagingStep { get; set; } = new bool[4] {false, false, false, false};
        public string ImagingStepJson { get; set; } = JsonConvert.SerializeObject(new bool[4] { false, false, false, false });
        public List<PreviousIssue> PreviousIssues { get; set; } = new List<PreviousIssue>();

    }
}
