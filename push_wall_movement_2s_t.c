#include "udf.h"
#include "math.h"

DEFINE_CG_MOTION(functionName, dt, vel, omega, time, dtime) {
    /* Reset linear and angular velocities */
    NV_S(vel, =, 0.0);
    NV_S(omega, =, 0.0);

    /* Define variables(constants) */
    real amplitude = 0.02; // 20mm
    real frequency = 0.5;
    real angularVelocity = 2 * M_PI * frequency; // omega = 2 pi f

    /* Compute velocities vel[1] is y velocity */
    vel[1] = amplitude * angularVelocity * cos(angularVelocity * time); // A omega cos( omega t )
    
    /* Debugging */
    printf("\nText Output");
    printf("\ncurrent y-velocity : %g, time: %g\n", vel[1], time);
}