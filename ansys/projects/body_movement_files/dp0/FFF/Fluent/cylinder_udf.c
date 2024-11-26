#include "udf.h"
#include "dynamesh_tools.h"
#include "unsteady.h"

FILE *fout;

DEFINE_SDOF_PROPERTIES(piston_motion, prop, dt, time, dtime)
{
    real amplitude = 0.01; // 진폭 (m)
    real frequency = 1.0;  // 주파수 (Hz)
    real omega = 2.0 * M_PI * frequency; // 각속도 (rad/s)
    real velocity_y; // Y축 속도
    real position_y; // Y축 위치
    real k = 200.0; // 강성 (N/m) 예시
    real c = 1.0; // 감쇠 계수 (N·s/m), 선택 사항

    // Y축 위치 및 속도 계산 (단순 조화 운동)
    position_y = amplitude * sin(omega * time);  // 위치
    velocity_y = amplitude * omega * cos(omega * time); // 속도

    // Y축 힘 설정 (강성 및 감쇠 고려)
    real force_y = -k * position_y - c * velocity_y;

    // 피스톤의 운동을 힘으로 설정
    prop[SDOF_LOAD_F_Y] = force_y; // Y축에 의한 힘

    // X, Z축 이동 및 회전 제한
    prop[SDOF_ZERO_TRANS_X] = TRUE; // X축 이동 제한
    prop[SDOF_ZERO_TRANS_Z] = TRUE; // Z축 이동 제한
    prop[SDOF_ZERO_ROT_X] = TRUE;  // X축 회전 제한
    prop[SDOF_ZERO_ROT_Y] = TRUE;  // Y축 회전 제한
    prop[SDOF_ZERO_ROT_Z] = TRUE;  // Z축 회전 제한

    // 결과 출력 (디버깅용)
    fout = fopen("results.txt", "a");
    fprintf(fout, "Time: %f, Velocity Y: %f, Position Y: %f, Force Y: %f\n", time, velocity_y, position_y, force_y);
    fclose(fout);
}
