#include "Shape.h"
#include "Shapes.cpp"

#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<unique_ptr<Shape>> shapes;

    shapes.push_back(make_unique<Circle>(5));
    shapes.push_back(make_unique<Rectangle>(12, 10));
    shapes.push_back(make_unique<Triangle>(10, 12, 14));
    shapes.push_back(make_unique<Circle>(8));
    shapes.push_back(make_unique<Rectangle>(15, 9));

    sort(
        shapes.begin(),
        shapes.end(),
        [](const unique_ptr<Shape> &a,
           const unique_ptr<Shape> &b)
        {
            return a->area() < b->area();
        });

    cout << "Shapes sorted by area:\n\n";

    for (const auto &shape : shapes)
    {
        shape->describe();
    }

    auto it = find_if(
        shapes.begin(),
        shapes.end(),
        [](const unique_ptr<Shape> &shape)
        {
            return shape->area() > 100;
        });

    cout << "\nFirst shape with area > 100:\n";

    if (it != shapes.end())
    {
        (*it)->describe();
    }
    else
    {
        cout << "No shape found.\n";
    }

    return 0;
}