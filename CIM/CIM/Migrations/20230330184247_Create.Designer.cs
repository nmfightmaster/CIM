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
    [Migration("20230330184247_Create")]
    partial class Create
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

                    b.Property<string>("PI")
                        .HasColumnType("TEXT");

                    b.Property<string>("PU")
                        .HasColumnType("TEXT");

                    b.Property<string>("ServiceTag")
                        .IsRequired()
                        .HasMaxLength(7)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Devices");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "CHASTEST",
                            OU = "\\chas.local\\CLINIC\\DEPT\\",
                            PI = "monitor issues",
                            PU = "Biggles T. McClure",
                            ServiceTag = "1234abc"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}