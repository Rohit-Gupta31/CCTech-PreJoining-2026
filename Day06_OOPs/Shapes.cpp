#include <bits/stdc++.h>
using namespace std;

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

    void describe() const override
    {
        cout << "Circle (radius = " << radius << "), Area = " << area() << ", Perimeter = " << perimeter() << endl;
    }
};

class Rectangle : public Shape
{
private:
    double length;
    double width;

public:
    Rectangle(double l, double w) : length(l), width(w) {}

    double area() const override
    {
        return length * width;
    }

    double perimeter() const override
    {
        return 2 * (length + width);
    }

    void describe() const override
    {
        cout << "Rectangle (length = " << length << ", width = " << width << "), Area = " << area() << ", Perimeter = " << perimeter() << endl;
    }
};

class Triangle : public Shape
{
private:
    double a;
    double b;
    double c;

public:
    Triangle(double side1, double side2, double side3) : a(side1), b(side2), c(side3) {}

    double perimeter() const override
    {
        return a + b + c;
    }

    double area() const override
    {
        double s = perimeter() / 2.0;
        return sqrt(s * (s - a) * (s - b) * (s - c));
    }

    void describe() const override
    {
        cout << "Triangle (" << a << ", " << b << ", " << c << "), Area = " << area() << ", Perimeter = " << perimeter() << endl;
    }
};