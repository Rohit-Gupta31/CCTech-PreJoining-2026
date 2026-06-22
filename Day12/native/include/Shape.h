#pragma once
#include <iostream>
#include <cmath>
#include <string>

using namespace std;

class Shape
{
public:
    virtual ~Shape() = default;

    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual void describe() const = 0;
};
