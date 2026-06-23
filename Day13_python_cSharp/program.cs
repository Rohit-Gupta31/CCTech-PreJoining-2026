using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Status { get; set; } = "";
}

class Program
{
    static void Main()
    {
        string json = File.ReadAllText("projects.json");

        List<Project> projects =
            JsonSerializer.Deserialize<List<Project>>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            ) ?? new List<Project>();

        var activeProjects = projects
            .Where(p => p.Status.Equals("active", StringComparison.OrdinalIgnoreCase))
            .OrderBy(p => p.Name)
            .ToList();

        Console.WriteLine("Active Projects:");

        foreach (var project in activeProjects)
        {
            Console.WriteLine($"{project.Id} - {project.Name}");
        }

        string outputJson = JsonSerializer.Serialize(
            activeProjects,
            new JsonSerializerOptions
            {
                WriteIndented = true
            });

        File.WriteAllText("filtered_projects_c.Json", outputJson);
    }
}