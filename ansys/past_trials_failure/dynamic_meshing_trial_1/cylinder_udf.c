#include "udf.h"
#include "dynamesh_tools.h"
#include "unsteady.h"

FILE *fout; 

DEFINE_SDOF_PROPERTIES(piston_motion, prop, dt, time, dtime)
{
    
    real amplitude = 0.01; 
    real frequency = 1.0;  
    real omega = 2.0 * M_PI * frequency; 
    real velocity_z; 

    
    velocity_z = amplitude * omega * cos(omega * time); 

    
    prop[SDOF_VELOCITY_Z] = velocity_z; 

    
    prop[SDOF_ZERO_TRANS_X] = TRUE; 
    prop[SDOF_ZERO_TRANS_Y] = TRUE; 
    prop[SDOF_ZERO_ROT_X] = TRUE;  
    prop[SDOF_ZERO_ROT_Y] = TRUE;  
    prop[SDOF_ZERO_ROT_Z] = TRUE;  

    
    fout = fopen("results.txt", "a");
    fprintf(fout, "Time: %f, Velocity Z: %f\n", time, velocity_z);
    fclose(fout);
}
