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
    real y; // 피스톤의 Y 위치

    // Y축 위치 및 속도 계산 (단순 조화 운동)
    y = amplitude * sin(omega * time);  // 위치
    velocity_y = amplitude * omega * cos(omega * time); // 속도

    // 피스톤의 CG 위치 지정 (동적 메쉬의 변형)
    prop[SDOF_MOTION_CG] = y;  // 피스톤의 CG를 Y축 위치로 설정

    // Y축 속도 설정
    prop[SDOF_VELOCITY_Y] = velocity_y;  // Y축 속도 설정

    // 물리적 특성 설정 (필요 시 질량, 강성 등)
    prop[SDOF_MASS] = 0.5; // 시스템 질량 (kg)
    prop[SDOF_LOAD_F_Y] = -200.0 * y; // Y축에 의한 힘 (필요 시 힘으로 설정)

    // X, Z축 이동 및 회전 제한
    prop[SDOF_ZERO_TRANS_X] = TRUE; // X축 이동 제한
    prop[SDOF_ZERO_TRANS_Z] = TRUE; // Z축 이동 제한
    prop[SDOF_ZERO_ROT_X] = TRUE;  // X축 회전 제한
    prop[SDOF_ZERO_ROT_Y] = TRUE;  // Y축 회전 제한
    prop[SDOF_ZERO_ROT_Z] = TRUE;  // Z축 회전 제한

    // 결과 출력 (디버깅용)
    fout = fopen("results.txt", "a");
    fprintf(fout, "Time: %f, Velocity Y: %f, Position Y: %f\n", time, velocity_y, y);
    fclose(fout);
}
