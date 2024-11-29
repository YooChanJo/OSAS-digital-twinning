#include "udf.h"

#define FREQUENCY 26.178
#define AMPLITUDE -5.0


DEFINE_GRID_MOTION(lunge,domain,dt,time,dtime){
    
    Thread *tf = DT_THREAD(dt);

    face_t f;
    Node *v;
    

    real NV_VEC(dx);  
    real velocity;
    int n;

   
    

    SET_DEFORMING_THREAD_FLAG(THREAD_T0(tf));
    

    velocity = AMPLITUDE * sin(FREQUENCY * time);
    

    Message ("time = %f, velocity = %f\n", time, velocity);

    begin_f_loop(f, tf) {
        f_node_loop(f, tf, n) {
            v = F_NODE(f, tf, n);

            
            if (NODE_X(v) > 0.020 && NODE_POS_NEED_UPDATE(v)) {
                NODE_POS_UPDATED(v);

                
                NV_S(dx, =, velocity * dtime);  
                NV_V(NODE_COORD(v), +=, dx);    
            }
        }
    }
    end_f_loop(f, tf);

}


