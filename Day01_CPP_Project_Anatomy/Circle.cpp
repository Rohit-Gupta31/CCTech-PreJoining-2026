#include <bits/stdc++.h>
#include "Shape.h"

class Circle : public Shape
{
private:
    double radius;

public:
    Circle(double r) : radius(r) {}

    double area() const override
    {
        return M_PI * radius * radius;
    }

    double perimeter() const override
    {
        return 2 * M_PI * radius;
    }
};
