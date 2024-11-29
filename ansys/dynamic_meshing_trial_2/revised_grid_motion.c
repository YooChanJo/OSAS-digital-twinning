#include "udf.h"
#include "dynamesh_tools.h"
#include "unsteady.h"
#include "math.h"

FILE *fout;

DEFINE_GRID_MOTION(piston_motion, domain, dt, time, dtime)
{
    real amplitude = 0.01; 
    real frequency = 1.0;  
    real omega = 2.0 * M_PI * frequency; 
    real mass = 1;

    real constant_k = sqrt(mass * omega * omega);
    real displacement_y = amplitude * sin(omega * time);  // Oscillating displacement

    /* Loop over all zones and apply motion to piston boundary face */
    cell_t c;
    Thread *t;
    
    /* Loop through the entire domain */
    thread_loop_c(t, domain)
    {
        begin_c_loop(c, t)
        {
            /* Check if this cell is part of the piston boundary */
            if (/* Condition to check if c is part of the piston boundary zone */)
            {
                /* Apply displacement to the face corresponding to the piston in Y-direction */
                F_V(c, t)[1] = displacement_y;  // Apply displacement in Y direction (1 = Y-direction)
            }
        }
        end_c_loop(c, t)
    }

    fout = fopen("results.txt", "a");
    fprintf(fout, "Time: %f, Displacement Y: %f\n", time, displacement_y);
    fclose(fout);
}
