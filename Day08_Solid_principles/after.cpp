#include <iostream>
#include <fstream>
#include <string>

using namespace std;

/*
SOLID Principles Applied:

1. DataReader
   - SRP: Responsible only for reading data from a file.
   - One reason to change: File reading logic.

2. ReportFormatter
   - SRP: Responsible only for formatting report content.
   - One reason to change: Report format requirements.

3. ConsolePrinter
   - SRP: Responsible only for displaying output.
   - One reason to change: Output medium changes.

4. EmailNotifier
   - SRP: Responsible only for sending notifications.
   - One reason to change: Notification mechanism changes.

Pattern Observed:
- Facade-like structure in main():
  Main coordinates several specialized classes,
  while each class handles a single responsibility.
*/

class DataReader
{
public:
    string readData(const string &filename)
    {
        ifstream file(filename);

        if (!file.is_open())
        {
            return "Error opening file!";
        }

        string data, line;

        while (getline(file, line))
        {
            data += line + "\n";
        }

        return data;
    }
};

class ReportFormatter
{
public:
    string format(const string &data)
    {
        return "REPORT :\n" +
               data +"\n";
    }
};

class ConsolePrinter
{
public:
    void print(const string &content)
    {
        cout << content << endl;
    }
};

class EmailNotifier
{
public:
    void sendNotification()
    {
        cout << "Email Notification Sent: Report generated successfully.\n";
    }
};

int main()
{
    DataReader reader;
    ReportFormatter formatter;
    ConsolePrinter printer;
    EmailNotifier notifier;

    string data = reader.readData("data.txt");
    string report = formatter.format(data);

    printer.print(report);
    notifier.sendNotification();

    return 0;
}