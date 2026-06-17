#include <iostream>
#include <fstream>
#include <string>

using namespace std;

// SRP Violation: One class doing multiple jobs
class Report
{
public:
    void generateReport(const string &filename)
    {
        ifstream file(filename);

        if (!file.is_open())
        {
            cout << "Error opening file!\n";
            return;
        }

        string data, line;

        // Read file
        while (getline(file, line))
        {
            data += line + "\n";
        }

        file.close();

        // Format data
        string formattedData = "REPORT : \n";
        formattedData += data;
        formattedData += "\n";

        // Print report
        cout << formattedData << endl;

        // Send email notification (simulation)
        cout << "Email Notification Sent: Report generated successfully."<<endl;
    }
};

int main()
{
    Report report;
    report.generateReport("data.txt");

    return 0;
}