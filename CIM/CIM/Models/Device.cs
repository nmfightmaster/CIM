﻿using Microsoft.Extensions.ObjectPool;
using System.ComponentModel;
using System.Text.Json.Serialization;
using System.Collections;

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
        public List<PreviousIssue> PreviousIssues { get; set; } = new List<PreviousIssue>();

    }
}
