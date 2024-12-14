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

    /* Define the piston boundary zone ID (assumed to be 6) */
    int piston_zone_id = 6;  // Zone ID for piston boundary (you need to verify this ID)

    /* Loop over all zones and apply motion to piston boundary face */
    cell_t c;
    Thread *t;

    /* Loop through all threads (zones) in the domain */
    thread_loop_c(t, domain)
    {
        /* Check if this thread corresponds to the piston boundary zone */
        if (THREAD_ID(t) == piston_zone_id)  // Check if the thread belongs to the piston boundary
        {
            /* Loop through all cells in the current thread (piston boundary) */
            begin_c_loop(c, t)
            {
                /* Apply displacement to the piston boundary face */
                F_V(c, t)[1] = displacement_y;  // Apply displacement in Y direction
            }
            end_c_loop(c, t)
        }
    }

    fout = fopen("results.txt", "a");
    fprintf(fout, "Time: %f, Displacement Y: %f\n", time, displacement_y);
    fclose(fout);
}
