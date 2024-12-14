#include "udf.h"
#include "dynamesh_tools.h"
#include "unsteady.h"
#include "math.h"

FILE *fout; 

DEFINE_SDOF_PROPERTIES(piston_motion, prop, dt, time, dtime)
{
    
    real amplitude = 0.01; 
    real frequency = 1.0;  
    real omega = 2.0 * M_PI * frequency; 
    real mass = 1;

    real constant_k = sqrt(mass * omega * omega);
    real force_y = -constant_k * amplitude * sin(omega * time);

    prop[SDOF_MASS] = mass;
    prop[SDOF_LOAD_F_Y] = force_y;
    
    prop[SDOF_ZERO_TRANS_X] = TRUE; 
    prop[SDOF_ZERO_TRANS_Z] = TRUE; 
    prop[SDOF_ZERO_ROT_X] = TRUE;  
    prop[SDOF_ZERO_ROT_Y] = TRUE;  
    prop[SDOF_ZERO_ROT_Z] = TRUE;  

    
    fout = fopen("results.txt", "a");
    fprintf(fout, "Time: %f, Force Y: %f\n", time, force_y);
    fclose(fout);
}