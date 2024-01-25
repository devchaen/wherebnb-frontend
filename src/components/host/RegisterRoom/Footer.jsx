// app/footer/page.jsx.jsx.tsx
"use client";


import Button from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { useHostData } from "@/context/HostDataContext"; // 임포트 경로는 실제 경로에 맞게 수정해주세요.
const Footer = () => {


    const { handleSubmit, hostData } = useHostData()
    const router = useRouter();
    const pathname = usePathname();
    const handleButtonClick = async () => {
        console.log("Current Pathname: ", pathname);
        switch (pathname) {
            case "/become-a-host/first/overview":
                router.push("/become-a-host/first/about-your-place");
                break;
            case "/become-a-host/first/about-your-place":
                router.push("/become-a-host/first/property-type");
                break;
            case "/become-a-host/first/property-type":
                if (typeof hostData.propertyType !== 'number' || hostData.propertyType < 1) {
                    alert('숙소 유형을 선택해주세요')
                    break;
                }
                router.push("/become-a-host/first/category");
                break;
            case "/become-a-host/first/category":
                if (typeof hostData.category !== 'number' || hostData.category < 1) {
                    alert('숙소 유형을 선택해주세요')
                    break;
                }
                router.push("/become-a-host/first/location");
                break;
            case "/become-a-host/first/location":
                if(hostData.country === '' || hostData.city === '' || hostData.street === '' || hostData.details === '') {
                    alert('주소를 입력해주세요')
                    break;
                }
                router.push("/become-a-host/first/floor-plan");
                break;
            case "/become-a-host/first/floor-plan":
                if(hostData.maxPeople < 1 || hostData.bathroom < 0 || hostData.bedroom < 0 || hostData.bed < 0) {
                    alert('숙소 정보를 입력해주세요')
                    break;
                }
                router.push("/become-a-host/second/stand-out");
                break;
            case "/become-a-host/second/stand-out":
                router.push("/become-a-host/second/amenities");
                break;
            case "/become-a-host/second/amenities":
                router.push("/become-a-host/second/title");
                break;
            case "/become-a-host/second/title":
                if(hostData.propertyName.length < 1) {
                    alert('숙소 제목을 입력해주세요')
                    break;
                }
                router.push("/become-a-host/second/description");
                break;
            case "/become-a-host/second/description":
                if(hostData.propertyExplanation < 1) {
                    alert('숙소 설명을 입력해주세요')
                    break;
                }
                router.push("/become-a-host/third/finish-setup");
                break;
            case "/become-a-host/third/finish-setup":
                router.push("/become-a-host/third/price");
                break;
            case "/become-a-host/third/price":
                if(hostData.price < 1) {
                    alert('숙소 가격을 입력해주세요')
                    break;
                }
                router.push("/become-a-host/third/checkinout");
                break;
            case "/become-a-host/third/checkinout":
                if(hostData.checkInTime < 0 || hostData.checkOutTime < 0) {
                    alert('체크인, 체크아웃 시간을 입력해주세요')
                    break;
                }
                router.push("/become-a-host/third/photos");
                break;
            case "/become-a-host/third/photos":
                if(hostData.photos.length < 3) {
                    alert('사진을 등록해주세요')
                    break;
                }
                router.push("/become-a-host/third/receipt");
                break;
            case "/become-a-host/third/receipt":
                await handleSubmit();
                router.push("/become-a-host/third/publish-celebration");
                break;
            case "/become-a-host/third/publish-celebration":
                router.push("/hosting");
                break;
            // 기타 케이스 추가 가능
            default:
                // 기본적으로 아무것도 하지 않거나 기본 경로로 리디렉션
                break;
        }
    };

    const handlePreviousButtonClick = async () => {
        console.log("Current Pathname: ", pathname);
        switch (pathname) {
            case "/become-a-host/first/about-your-place":
                router.push("/become-a-host/first/overview");
                break;
            case "/become-a-host/first/property-type":
                router.push("/become-a-host/first/about-your-place");
                break;
            case "/become-a-host/first/category":
                router.push("/become-a-host/first/property-type");
                break;
            case "/become-a-host/first/location":
                router.push("/become-a-host/first/category");
                break;
            case "/become-a-host/first/floor-plan":
                router.push("/become-a-host/first/location");
                break;
            case "/become-a-host/second/stand-out":
                router.push("/become-a-host/first/floor-plan");
                break;
            case "/become-a-host/second/amenities":
                router.push("/become-a-host/second/stand-out");
                break;
            case "/become-a-host/second/title":
                router.push("/become-a-host/second/amenities");
                break;
            case "/become-a-host/second/description":
                router.push("/become-a-host/second/title");
                break;
            case "/become-a-host/third/finish-setup":
                router.push("/become-a-host/second/description");
                break;
            case "/become-a-host/third/price":
                router.push("/become-a-host/third/finish-setup");
                break;
            case "/become-a-host/third/checkinout":
                router.push("/become-a-host/third/price");
                break;
            case "/become-a-host/third/photos":
                router.push("/become-a-host/third/checkinout");
                break;
            case "/become-a-host/third/receipt":
                router.push("/become-a-host/third/photos");
                break;
            case "/become-a-host/third/publish-celebration":
                router.push("/become-a-host/third/receipt");
                break;
            // 기타 케이스 추가 가능
            default:
                // 기본적으로 아무것도 하지 않거나 기본 경로로 리디렉션
                break;
        }
    };


    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 px-6 py-4 flex flex-row items-center justify-between">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="px-10">
                    <Button
                        label="이전"
                        onClick={handlePreviousButtonClick}
                    />

                </div>
                <div className="px-10">
                    <Button
                        label="다음"
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
