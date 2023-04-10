﻿// <auto-generated />
using CIM.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CIM.Migrations
{
    [DbContext(typeof(CIMContext))]
    [Migration("20230410224409_PIConfig")]
    partial class PIConfig
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.4");

            modelBuilder.Entity("CIM.Models.Device", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(9)
                        .HasColumnType("TEXT");

                    b.Property<string>("OU")
                        .HasColumnType("TEXT");

                    b.Property<string>("PU")
                        .HasColumnType("TEXT");

                    b.Property<string>("ServiceTag")
                        .IsRequired()
                        .HasMaxLength(7)
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Devices");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "CHASTEST",
                            OU = "\\chas.local\\CLINIC\\DEPT\\",
                            PU = "Biggles T. McClure",
                            ServiceTag = "1234abc",
                            Status = "Deployable"
                        },
                        new
                        {
                            Id = 2,
                            Name = "CHASTEST2",
                            OU = "\\chas.local\\CLINIC2\\DEPT2\\",
                            PU = "Bo 'Bobo' BoBoBo",
                            ServiceTag = "5678def",
                            Status = "Needs Imaged"
                        },
                        new
                        {
                            Id = 3,
                            Name = "CHASTEST3",
                            OU = "\\chas.local\\CLINIC3\\DEPT3\\",
                            PU = "Hugh Mungus",
                            ServiceTag = "910ghij",
                            Status = "Deployed"
                        });
                });

            modelBuilder.Entity("CIM.Models.PreviousIssue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DeviceId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("IssueDate")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("IssueDetails")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("IssueType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Technician")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.ToTable("PreviousIssues");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DeviceId = 1,
                            IssueDate = "04/10/2023 15:44:09",
                            IssueDetails = "Screen Cracked",
                            IssueType = "Hardware",
                            Technician = "Bobo"
                        },
                        new
                        {
                            Id = 2,
                            DeviceId = 1,
                            IssueDate = "04/10/2023 15:44:09",
                            IssueDetails = "Blue Screen",
                            IssueType = "Software",
                            Technician = "Bobo"
                        },
                        new
                        {
                            Id = 3,
                            DeviceId = 2,
                            IssueDate = "04/10/2023 15:44:09",
                            IssueDetails = "Screen Cracked2",
                            IssueType = "Hardware",
                            Technician = "Bibi"
                        },
                        new
                        {
                            Id = 4,
                            DeviceId = 2,
                            IssueDate = "04/10/2023 15:44:09",
                            IssueDetails = "Blue Screen2",
                            IssueType = "Software",
                            Technician = "Bibi"
                        },
                        new
                        {
                            Id = 5,
                            DeviceId = 3,
                            IssueDate = "04/10/2023 15:44:09",
                            IssueDetails = "Screen Cracked3",
                            IssueType = "Hardware",
                            Technician = "Baba"
                        },
                        new
                        {
                            Id = 6,
                            DeviceId = 3,
                            IssueDate = "04/10/2023 15:44:09",
                            IssueDetails = "Blue Screen3",
                            IssueType = "Software",
                            Technician = "Baba"
                        });
                });

            modelBuilder.Entity("CIM.Models.PreviousIssue", b =>
                {
                    b.HasOne("CIM.Models.Device", "Device")
                        .WithMany("PreviousIssues")
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Device");
                });

            modelBuilder.Entity("CIM.Models.Device", b =>
                {
                    b.Navigation("PreviousIssues");
                });
#pragma warning restore 612, 618
        }
    }
}
