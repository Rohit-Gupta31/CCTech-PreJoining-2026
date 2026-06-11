#include <bits/stdc++.h>
using namespace std;

// A class used to demonstrate ownership
class Resource
{
public:
    // constructor
    Resource()
    {
        cout << "acquired" << endl;
    }
    // destructor
    ~Resource()
    {
        cout << "released" << endl;
    }

    void show() const
    {
        cout << "Using Resource" << endl;
    }
};

// reads the resource without taking ownership.

void take(const Resource &r)
{
    cout << "Inside take : reading resources without ownership" << endl;
    r.show();
}

int main()
{

    // p1 becomes the sole owner
    unique_ptr<Resource> p1 = make_unique<Resource>();

    // Access resource without ownership transfer.
    take(*p1);

    // Transfer ownership from p1 to p2.
    unique_ptr<Resource> p2 = move(p1);

    // p1 should now be empty.
    if (p1 == nullptr)
    {
        cout << "p1 no longer owns the resource" << endl;
    }

    // p2 is now the owner.
    if (p2)
    {
        cout << "p2 now owns the resource" << endl;
        p2->show();
    }

    return 0;
}