#include "udf.h"

#define FREQUENCY 26.178
#define AMPLITUDE -5.0


DEFINE_GRID_MOTION(lunge,domain,dt,time,dtime){
    //이미 있는 스레드에서 외부 파일까지 참조
    Thread *tf = DT_THREAD(dt);

    face_t f;
    Node *v;
    // face_t는 메쉬 면을 정의, Node *v는 노드 포인터.

    real NV_VEC(dx);  // 선형 운동을 위한 벡터
    real velocity;
    int n;

    real velocity;
    int n;
    //sign은 시간에 따라 변하는 속도를 저장, n은 루프 내에서 노드 인덱스를 저장합니다.

    SET_DEFORMING_THREAD_FLAG(THREAD_T0(tf));
    //현재 스레드가 변형 가능하도록 플래그 설정.

    velocity = AMPLITUDE * sin(FREQUENCY * time);
    //사인 함수에 따라 변화

    Message ("time = %f, velocity = %f\n", time, velocity);

    begin_f_loop(f, tf) {
        f_node_loop(f, tf, n) {
            v = F_NODE(f, tf, n);

            // 여기에서 선형 운동을 업데이트
            if (NODE_X(v) > 0.020 && NODE_POS_NEED_UPDATE(v)) {
                NODE_POS_UPDATED(v);

                // 속도에 따른 노드 위치 변경
                NV_S(dx, =, velocity * dtime);  // 속도에 따라 위치 변화
                NV_V(NODE_COORD(v), +=, dx);    // 노드 좌표 업데이트
            }
        }
    }
    end_f_loop(f, tf);

}


