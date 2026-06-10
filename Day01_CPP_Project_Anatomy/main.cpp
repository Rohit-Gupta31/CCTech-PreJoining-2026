#include <bits/stdc++.h>

using namespace std;

#include "Shape.h"
#include "Circle.cpp"

int main()
{
    unique_ptr<Shape> shape =
        make_unique<Circle>(5.0);

    cout << "Area: " << shape->area() << endl;

    cout << "Perimeter: " << shape->perimeter() << endl;

    return 0;
}